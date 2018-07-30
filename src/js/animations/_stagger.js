export default props => {
  return ( 
    new TimelineMax()
      .staggerTo( props.elements, props.duration, {
        y: props.y || 0,
        x: props.x || 0,
        scale: props.scale || 1,
        opacity: props.opacity || 1,
        ease: props.ease || Power0.easeNone
      }, props.delay || 0.1 )
      .eventCallback('onComplete', props.onComplete, null)
  );
};
