"use client";
import { Unity, useUnityContext } from "react-unity-webgl";

export const UnitySportsResortContext = () => {
  const { unityProvider } = useUnityContext({
    dataUrl: "/unity-sports-resort/Build/UnitySportsResort.data.unityweb",
    frameworkUrl:
      "/unity-sports-resort/Build/UnitySportsResort.framework.js.unityweb",
    codeUrl: "/unity-sports-resort/Build/UnitySportsResort.wasm.unityweb",
    loaderUrl: "/unity-sports-resort/Build/UnitySportsResort.loader.js",
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
