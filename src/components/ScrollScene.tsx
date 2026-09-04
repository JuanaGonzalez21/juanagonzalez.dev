import { forwardRef, type HTMLAttributes } from "react";

const ScrollScene = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  function ScrollScene({ children, className = "", ...props }, ref) {
    return (
      <section {...props} ref={ref} className={`scroll-scene ${className}`}>
        <div className="scene-panel">
          <div className="scene-content">{children}</div>
        </div>
      </section>
    );
  },
);

export default ScrollScene;
