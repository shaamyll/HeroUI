import Squares from '../components/Squares';

export default function HomePage() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Squares 
        speed={0.5}
        squareSize={40}
        direction="diagonal" // up, down, left, right, diagonal
        borderColor="#fff"
       
      />
    </div>
  );
}
