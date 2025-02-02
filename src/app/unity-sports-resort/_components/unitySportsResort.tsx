"use client";
import { Unity, useUnityContext } from "react-unity-webgl";

export const UnitySportsResort = () => {
  const { unityProvider } = useUnityContext({
    dataUrl:
      "https://roppoh-assets.tsar-bmb.org/unity-sports-resort/build/UnitySportsResort.data.unityweb",
    frameworkUrl:
      "https://roppoh-assets.tsar-bmb.org/unity-sports-resort/build/UnitySportsResort.framework.js.unityweb",
    codeUrl:
      "https://roppoh-assets.tsar-bmb.org/unity-sports-resort/build/UnitySportsResort.wasm.unityweb",
    loaderUrl:
      "https://roppoh-assets.tsar-bmb.org/unity-sports-resort/build/UnitySportsResort.loader.js",
  });

  return (
    <>
      <Unity
        unityProvider={unityProvider}
        style={{ width: "100vw", height: "100vh" }}
      />
    </>
  );
};
