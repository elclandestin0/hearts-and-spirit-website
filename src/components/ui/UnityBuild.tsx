"use client";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnityBuild() {
  const { unityProvider, loadingProgression, sendMessage, requestFullscreen } =
    useUnityContext({
      loaderUrl: "/Build/webgl.loader.js",
      dataUrl: "/Build/webgl.data",
      frameworkUrl: "/Build/webgl.framework.js",
      codeUrl: "/Build/webgl.wasm",
      companyName: "SeeyufStudios",
      productName: "hearts&spirit",
      productVersion: "0.0.1",
    });

  return (
    <div>
      <div style={{ width: "100%", aspectRatio: "16/9" }}>
        <Unity unityProvider={unityProvider} style={{ width: "100%", height: "100%" }} />
      </div>

      {loadingProgression < 1 && (
        <p>Loading… {Math.round(loadingProgression * 100)}%</p>
      )}

      <button onClick={() => requestFullscreen(true)}>Fullscreen</button>
      <button onClick={() => sendMessage("Bridge", "OnPing", "Hi!")}>
        SendMessage
      </button>
    </div>
  );
}
