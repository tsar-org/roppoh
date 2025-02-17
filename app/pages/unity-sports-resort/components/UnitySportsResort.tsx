import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnitySportsResort() {
  const { unityProvider } = useUnityContext({
    dataUrl:
      "https://roppoh-assets.tsar-bmb.org/unity-sports-resort.data.unityweb",
    frameworkUrl:
      "https://roppoh-assets.tsar-bmb.org/unity-sports-resort.framework.js.unityweb",
    codeUrl:
      "https://roppoh-assets.tsar-bmb.org/unity-sports-resort.wasm.unityweb",
    loaderUrl:
      "https://roppoh-assets.tsar-bmb.org/unity-sports-resort.loader.js",
  });

  return (
    <>
      <Unity
        unityProvider={unityProvider}
        style={{ width: "100vw", height: "100vh" }}
      />
    </>
  );
}
