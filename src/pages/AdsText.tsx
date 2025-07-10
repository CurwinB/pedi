const AdsText = () => {
  // Set the correct content-type header and return the ads.txt content
  const adsContent = "google.com, pub-7090276082010145, DIRECT, f08c47fec0942fa0";
  
  return (
    <pre style={{ margin: 0, fontFamily: 'monospace' }}>
      {adsContent}
    </pre>
  );
};

export default AdsText;