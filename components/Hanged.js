import { Image } from 'react-native';

function Hanged({errors}) {
    const hangedImages = [
      require('../assets/Forca00.png'),
      require('../assets/Forca01.png'),
      require('../assets/Forca02.png'),
      require('../assets/Forca03.png'),
      require('../assets/Forca04.png'),
      require('../assets/Forca05.png'),
      require('../assets/Forca06.png')
    ];
  
    return (
      <>
        <Image source={hangedImages[errors]} />
      </>
    );
  }
  
  export default Hanged