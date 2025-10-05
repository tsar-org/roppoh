import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnitySportsResort() {
  const { unityProvider } = useUnityContext({
    codeUrl:
      "https://roppoh-assets.tsar-bmb.org/unity-sports-resort.wasm.unityweb",
    dataUrl:
      "https://roppoh-assets.tsar-bmb.org/unity-sports-resort.data.unityweb",
    frameworkUrl:
      "https://roppoh-assets.tsar-bmb.org/unity-sports-resort.framework.js.unityweb",
    loaderUrl:
      "https://roppoh-assets.tsar-bmb.org/unity-sports-resort.loader.js",
  });

  return (
    <Unity
      style={{ height: "100vh", width: "100vw" }}
      unityProvider={unityProvider}
    />
  );
}
