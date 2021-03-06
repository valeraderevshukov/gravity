export default props => {
  return ( 
    new TimelineMax({ paused: true })
      .to(props.container, props.duration || 2, {
        strokeDashoffset: props.dashoffset || 0,
        ease: props.ease || Expo.easeIn
      }, props.delay || 0)
  );
};

