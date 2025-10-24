interface Props {
  title: string;
  staticAssetBaseUrl: string;
}

export const OG = ({ title, staticAssetBaseUrl }: Props) => {
  return (
    <div
      style={{
        backgroundColor: "#000",
        backgroundImage: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "80px",
        width: "100%",
      }}
    >
      {/* Header with site name and favicon */}
      <div
        style={{
          alignItems: "center",
          display: "flex",
          gap: "16px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: "12px",
            color: "#000",
            display: "flex",
            fontSize: "28px",
            fontWeight: "bold",
            height: "48px",
            justifyContent: "center",
            width: "48px",
          }}
        >
          <img alt="icon" src={`${staticAssetBaseUrl}/icons/tsar-icon.png`} />
        </div>
        <div
          style={{
            fontSize: "32px",
            fontWeight: "600",
            letterSpacing: "0.5px",
          }}
        >
          Roppoh
        </div>
      </div>

      {/* Main title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            lineHeight: "1.2",
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>
      </div>

      {/* Footer decoration */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "2px",
          display: "flex",
          height: "4px",
          width: "100px",
        }}
      />
    </div>
  );
};
