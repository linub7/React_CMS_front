const ParallaxImage = ({
  url = '/images/kevin.jpg',
  children,
  paddingTop = '100px',
  paddingBottom = '75px',
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${url})`,
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        paddingTop,
        paddingBottom,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'block',
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxImage;
