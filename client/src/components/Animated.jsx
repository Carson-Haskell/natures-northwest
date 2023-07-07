export default function Animated({ children, transitionSpeed = "300ms" }) {
  return (
    <div className="wrapper">
      <div
        style={{
          animation: `slide ${transitionSpeed} cubic-bezier(0.15, 0.75, 0.25, 1.05)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
