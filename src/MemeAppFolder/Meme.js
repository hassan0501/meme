import './meme.css'
import {useState,useEffect} from 'react'
//import trollFace from '../images/troll.png'

export default function MemeGenerator(){
   const [meme,setMeme] = useState(
      {
         topText:'',
         bottomText:'',
         memeUrl: ''
      }
   )

   const [allMemes,setAllMemes] = useState([])
   

   function handleChange(event){
      const {value , name} = event.currentTarget
     setMeme(prevState => ({
      ...prevState,
      [name]:value
     }))
   }

   useEffect(() => {
      fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(data => setAllMemes(data.data.memes))
         
   }, [])

   function getRandomMemeImage(){
      const randomNum = Math.ceil(Math.random() * allMemes.length)
      setMeme(prevMeme => ({
         ...prevMeme,
         memeUrl:allMemes[randomNum].url
      
      }))
      
   }

   return(
      
      <div className="container">
          <header className="header">
            <img alt='' className='troll-img'
                 
            />
            <h1>Meme Generator</h1>
        </header>
         <main>
         <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="Enter Top Text"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Enter Bottom Text"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>
                <button onClick={getRandomMemeImage}>Get a new meme image 🖼</button>
                </div>

                <div className="meme">
                <img alt='memeImage' src={meme.memeUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
         </main>

      </div>
   
   )
}
