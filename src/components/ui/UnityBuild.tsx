"use client";
import { Unity, useUnityContext } from "react-unity-webgl";
import { Button } from "@/components/ui/button";

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
    <div className="p-4">
      <div style={{ width: "100%", aspectRatio: "16/9" }}>
        <Unity unityProvider={unityProvider} style={{ width: "100%", height: "100%" }} />
      </div>

      {loadingProgression < 1 && (
        <p className="mt-3 text-sm text-slate-300/80">
          Loading… {Math.round(loadingProgression * 100)}%
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          className="text-emerald-900/20 hover:text-black dark:text-black bg-emerald-900/20 border-[#FFF385] text-white hover:text-black hover:bg-[#FFF385]"
          onClick={() => requestFullscreen(true)}
        >
          Fullscreen
        </Button>
      </div>
    </div>
  );
}
