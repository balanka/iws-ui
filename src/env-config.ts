window._env_ = {
  SCHEME: window.location.protocol.replace(":", ""),
  API_URL: window.location.host,
  REACT_WEB_HOST_IP_ADDRESS: window.location.host,
  API_PORT: "${IWS_API_PORT_TO}",
  REACT_APP_API_BASE: "/api",
  REACT_APP_VERSION: "${REACT_APP_VERSION}",
  NODE_ENV: "${NODE_ENV}"
}
