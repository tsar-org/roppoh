"use client";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnitySportsResort() {
  const { unityProvider } = useUnityContext({
    dataUrl: "/unity-sports-resort/build/UnitySportsResort.data.unityweb",
    frameworkUrl:
      "/unity-sports-resort/build/UnitySportsResort.framework.js.unityweb",
    codeUrl: "/unity-sports-resort/build/UnitySportsResort.wasm.unityweb",
    loaderUrl: "/unity-sports-resort/build/UnitySportsResort.loader.js",
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
