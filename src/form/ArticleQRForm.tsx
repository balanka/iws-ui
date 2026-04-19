import { JSX } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface ArticleQRFormProps {
  readonly current: any;
  readonly t: (key: string) => string;
}

export const ArticleQRForm = ({ current }: ArticleQRFormProps): JSX.Element => {
  const qrValue = `${current?.id || ''} ${current?.name || ''}`;

  return (
    <div style={{
      padding: '20px',
      display: 'flex',
      gap: '30px',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ background: 'white', padding: '15px', borderRadius: '8px' }}>
        <QRCodeSVG
          value={qrValue}
          size={200}
          bgColor="#FFFFFF"
          fgColor="#000000"
        />
      </div>
      <div>
        <img
          src="/apple-icon-180x180.png"
          alt="Logo"
          style={{ width: '150px', height: 'auto' }}
        />
      </div>
    </div>
  );
};

export default ArticleQRForm;
