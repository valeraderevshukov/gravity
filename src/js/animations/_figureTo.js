export default props => {
  return ( 
    new TimelineMax({ paused: true })
      .staggerTo(props.container, props.duration || 2, {
        transform: `translate3d(${props.x || 0},${props.y || 0},0)`,
        ease: props.ease || Sine.easeOut
      }, props.delay || -0.08)
  );
};
