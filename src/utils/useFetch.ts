import {useEffect, useState} from 'react'

// Define response structure
// interface ApiResponse<T> {
//   data?: T;
//   error?: ApiError;
// }
//
// // Define fetch configuration with query parameters
// interface FetchConfig {
//   method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
//   headers?: Record<string, string>;
//   queryParams?: Record<string, string | number>;
// }

const compose = (middlewares:any) => {
  return (ctx:any) => {
    const dispatch = (i:any) => {
      const fn = middlewares[i];
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(ctx, () => dispatch(i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    };
    return dispatch(0);
  };
};
const logger = async (ctx:any, next:any) => {
  const start = Date.now();
  await next();
  console.log(`${ctx.method} ${ctx.url} - ${Date.now() - start}ms`);
};

const auth = async (ctx:any, next:any) => {
  ctx.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  await next();
};
const apiClient = compose([logger, auth, async (ctx:any) => {
  ctx.response = await fetch(ctx.url, {
    method: ctx.method,
    headers: ctx.headers
  });
}]);


// Usage
const context = { url: '/api/data', method: 'GET', headers: {} };
await apiClient(context);

export function useGet<A>(ctx:string, token:string, init:A[] ) {
    const [data, setData] = useState<A[]>(init)
    const [isLoading, setIsLoading] = useState(false)
    const [errMessage, setErrMessage] = useState('')
    useEffect(() => {
        setIsLoading(true)
        console.log('calling Fetch>>>>', ctx)
        fetch(ctx, {headers: {method: 'GET', Accept: 'application/json', Authorization: `Bearer ${token}`},
        }).then((response) => response.json())
            .then((_data: A[]) => setData(_data))
               .catch((e:any) => setErrMessage(e.message))
    }, [ctx])
    console.log('data>>>>', data)
    console.log('isLoading>>>>', isLoading)
    console.log('errMessage>>>>', errMessage)
    return [data??[], isLoading, errMessage]
}



/**
 * Fetch example Json data
 * Not recommended for production use!
 */
export const useFetchJson = <T,>(url:string, limit?: number) => {
    const [data, setData] = useState<T[]>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            // Note error handling is omitted here for brevity
            const response = await fetch(url);
            const json = await response.json();
            const data = limit ? json.slice(0, limit) : json;
            setData(data);
            setLoading(false);
        };
        fetchData();
    }, [url, limit]);
    return { data, loading };
};

// Define custom error type
// interface ApiError {
//   message: string;
//   status?: number;
// }

// Generic fetch function
// async function fetchData<T>(url: string, config: FetchConfig = {}): Promise<ApiResponse<T>> {
//   try {
//     // Construct URL with query parameters
//     let finalUrl = url;
//     if (config.queryParams) {
//       const params = new URLSearchParams();
//       for (const [key, value] of Object.entries(config.queryParams)) {
//         params.append(key, value.toString());
//       }
//       finalUrl = `${url}?${params.toString()}`;
//     }
//
//     // Make fetch request
//     const response = await fetch(finalUrl, {
//       method: config.method || 'GET',
//       headers: config.headers,
//     });
//
//     // Check for HTTP errors
//     if (!response.ok) {
//       return {
//         error: {
//           message: `HTTP error: ${response.statusText}`,
//           status: response.status,
//         },
//       };
//     }
//
//     // Parse and return data
//     const data: T = await response.json();
//     return { data };
//   } catch (error) {
//     // Handle network or other errors
//     return {
//       error: {
//         message: error instanceof Error ? error.message : 'Unknown error occurred',
//       },
//     };
//   }
// }

// Sample data interfaces
// interface User {
//   id: number;
//   name: string;
//   email: string;
// }
//
// interface Product {
//   id: number;
//   name: string;
//   price: number;
// }

// Example usage
// async function main() {
//   // Fetch users with query parameters
//   const userResponse = await fetchData<User[]>(
//     'https://api.example.com/users',
//     {
//       queryParams: { limit: 10, page: 1 },
//       headers: { Authorization: 'Bearer token123' },
//     }
//   );
//
//   if (userResponse.data) {
//     console.log('Users:', userResponse.data);
//   } else {
//     console.error('User fetch error:', userResponse.error);
//   }
//
//   // Fetch products
//   const productResponse = await fetchData<Product[]>(
//     'https://api.example.com/products',
//     {
//       queryParams: { category: 'electronics' },
//     }
//   );
//
//   if (productResponse.data) {
//     console.log('Products:', productResponse.data);
//   } else {
//     console.error('Product fetch error:', productResponse.error);
//   }
// }


