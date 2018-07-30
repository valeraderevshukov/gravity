export default props => {
  return ( 
    new TimelineMax({ paused: true })
      .staggerFromTo(props.container, props.duration || 2, {
        transform: `translate3d(${props.fromX || 0},${props.fromY || 0},0)`
      }, {
        transform: `translate3d(${props.toX || 0},${props.toY || 0},0)`,
        ease: props.ease || Sine.easeOut
      }, props.delay || -0.08)
      .eventCallback('onComplete', props.onComplete, null)
  );
};
