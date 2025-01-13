// from RWD example in lecture 9
const winDims = () => ({
  height: window.innerHeight,
  width: window.innerWidth,
});

const ResponsiveLayout = ({breakPoint = 555, renderNarrow, renderDefault}) => {
  const {width} = winDims();
  // window.alert(width);
  return width >= breakPoint ? renderDefault() : renderNarrow();
};

export default ResponsiveLayout;
