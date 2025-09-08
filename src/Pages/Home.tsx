import TextType from '../components/ui/TextType'

function Home() {
  return (
    <div className='min-h-screen'>
      <div className='mx-auto w-3/4 mt-20'>
<TextType
  text={["Welcome to Lyncs V2", "Experience the future", "Join us today"]}
  className="text-5xl font-bold pt-15"
  typingSpeed={75}
  pauseDuration={1500}
  showCursor={true}
  cursorCharacter="_"
  cursorClassName="text-black font-bold"
  textColors={["#333", "#333", "#333"]}
  loop={true}
/>
      </div>
    </div>
  )
}

export default Home