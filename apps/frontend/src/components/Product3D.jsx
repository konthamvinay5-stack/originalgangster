// apps/frontend/src/components/Product3D.jsx
import React from "react";

/**
 * Props:
 *  - src: string (URL to .glb model)
 *  - iosSrc: string (optional URL to .usdz model for iOS Quick Look)
 *  - alt: string
 *  - ar: boolean (enable AR features)
 */
export default function Product3D({ src, iosSrc, alt = "3D model", ar = true }) {
  if (!src) return null;

  // model-viewer supports: ar, ar-modes, quick-look-browsers, camera-controls, auto-rotate
  // We set style to make it responsive.
  return (
    <div className="w-full">
      {/* model-viewer is a custom element loaded by the script in index.html */}
      <model-viewer
        src={src}
        ios-src={iosSrc || ""}
        alt={alt}
        ar={ar}
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        environment-image="neutral"   /* use a built-in environment; optional */
        style={{
          width: "100%",
          height: "520px",
          backgroundColor: "transparent",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {/* Fallback content for browsers that don't support model-viewer */}
        <div className="p-6 text-center">
          <p>3D model not supported on this device / browser.</p>
        </div>
      </model-viewer>

      <div className="mt-2 text-xs text-slate-500">
        Tip: pinch to zoom. On mobile open the AR option to view in Phone/Tablet.
      </div>
    </div>
  );
}
