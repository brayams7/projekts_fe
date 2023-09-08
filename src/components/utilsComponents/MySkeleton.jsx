import ContentLoader from "react-content-loader";

// eslint-disable-next-line react/prop-types
export const MySkeleton = ({
  width = "100%",
  height = 700,
  backgroundColor = "#677ca8",
  foregroundColor = "#f1eeee",
  speed = 3,
}) => {
  return (
    <ContentLoader
      speed={speed}
      width={width}
      height={height}
      // viewBox="0 0 800 160"
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
    >
      <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
      <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
      <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <circle cx="20" cy="20" r="20" />
    </ContentLoader>
  );
};

export const CardLoader = (
  // eslint-disable-next-line react/prop-types
  {
    width = 200,
    height = 700,
    backgroundColor = "#677ca8",
    foregroundColor = "#f1eeee",
    speed = 3,
    ...props
  }
) => {
  return (
    <ContentLoader
      // viewBox="0 0 260 160"
      foregroundColor={foregroundColor}
      backgroundColor={backgroundColor}
      height={height}
      speed={speed}
      width={width}
      {...props}
    >
      <circle cx="50" cy="30" r="30" />
      <rect x="10" y="70" rx="3" ry="3" width="40" height="10" />
      <rect x="60" y="70" rx="3" ry="3" width="70" height="10" />
      <rect x="140" y="70" rx="3" ry="3" width="20" height="10" />
      <rect x="10" y="90" rx="3" ry="3" width="90" height="10" />
      <rect x="110" y="90" rx="3" ry="3" width="70" height="10" />
      <rect x="10" y="110" rx="3" ry="3" width="70" height="10" />
      <rect x="90" y="110" rx="3" ry="3" width="60" height="10" />
    </ContentLoader>
  );
};

export const DoorDashLoader = (
  // eslint-disable-next-line react/prop-types
  {
    width = "100%",
    height = 100,
    backgroundColor = "#677ca8",
    foregroundColor = "#f1eeee",
    speed = 3,
    ...props
  }
) => {
  return (
    <ContentLoader
      width={width}
      height={height}
      speed={speed}
      // viewBox="0 0 450 400"
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
      {...props}
    >
      {/* <rect x="43" y="100" rx="4" ry="4" width="271" height="9" /> */}
      {/* <rect x="44" y="100" rx="3" ry="3" width="119" height="6" /> */}
      <rect x="0" y="0" rx="10" ry="10" width="200" height="100" />
    </ContentLoader>
  );
};

export const AvatarWithTextLoader = (
  // eslint-disable-next-line react/prop-types
  {
    width = 400,
    height = 150,
    backgroundColor = "#677ca8",
    foregroundColor = "#f1eeee",
    speed = 3,
    ...props
  }
) => (
  <ContentLoader
    // viewBox="0 0 400 160"
    backgroundColor={backgroundColor}
    foregroundColor={foregroundColor}
    height={height}
    width={width}
    speed={speed}
    {...props}
  >
    <rect x="110" y="21" rx="4" ry="4" width="254" height="6" />
    <rect x="111" y="41" rx="3" ry="3" width="185" height="7" />
    <rect x="304" y="-46" rx="3" ry="3" width="350" height="6" />
    <rect x="371" y="-45" rx="3" ry="3" width="380" height="6" />
    <rect x="484" y="-45" rx="3" ry="3" width="201" height="6" />
    <circle cx="48" cy="48" r="48" />
  </ContentLoader>
);

export const CalloutStripLoader = (
  // eslint-disable-next-line react/prop-types
  {
    width = 400,
    height = 40,
    backgroundColor = "#677ca8",
    foregroundColor = "#f1eeee",
    speed = 3,
    ...props
  }
) => {
  return (
    <ContentLoader
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
      viewBox="0 0 400 31"
      height={height}
      width={width}
      speed={speed}
      {...props}
    >
      <rect height="5.5" rx="1" ry="1" width="340" x="31" y="5" />
      <rect height="5.5" rx="1" ry="1" width="340" x="31" y="15" />
      <circle cx="388" cy="12" r="12" />
      <rect height="24" rx="0" ry="0" width="24" x="0" y="0" />
    </ContentLoader>
  );
};

export const RectangleLoader = (
  // eslint-disable-next-line react/prop-types
  {
    width = 400,
    height = 40,
    backgroundColor = "#677ca8",
    foregroundColor = "#f1eeee",
    speed = 3,
    ...props
  }
) => {
  return (
    <ContentLoader
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
      // viewBox="0 0 400 31"
      height={height}
      width={width}
      speed={speed}
      {...props}
    >
      <rect height="20" rx="1" ry="1" width="340" x="31" y="5" />
      {/* <rect height="5.5" rx="1" ry="1" width="340" x="31" y="15" /> */}
      {/* <circle cx="388" cy="12" r="12" /> */}
      {/* <rect height="24" rx="0" ry="0" width="24" x="0" y="0" /> */}
    </ContentLoader>
  );
};

export const HeaderWorkspaceLoader = (
  // eslint-disable-next-line react/prop-types
  {
    width = "100%",
    height = 40,
    backgroundColor = "#677ca8",
    foregroundColor = "#f1eeee",
    speed = 3,
    ...props
  }
) => {
  return (
    <ContentLoader
      // viewBox="0 0 462 160"
      height={height}
      width={width}
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
      speed={speed}
      {...props}
    >
      <rect x="90" y="16" rx="5" ry="5" width="321" height="15" />
      <rect x="129" y="39" rx="5" ry="5" width="220" height="9" />
      <rect x="26" y="10" rx="0" ry="0" width="50" height="45" />
      <rect x="13" y="54" rx="0" ry="0" width="0" height="0" />
      <rect x="13" y="50" rx="0" ry="0" width="0" height="0" />
    </ContentLoader>
  );
};
