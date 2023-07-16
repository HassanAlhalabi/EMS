
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
  return (
    <div style={{
          zIndex: 99999,
          position: "fixed",
          display: 'flex',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0
        }}>
        <HashLoader style={{margin: 'auto'}} color="#27bcfd" />
    </div>
  )
}

export default Loader
