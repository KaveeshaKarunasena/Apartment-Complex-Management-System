import React ,{useEffect, useState} from 'react'
import './searchBar.css'
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";


const SearchBar = ({placeholder}) => {

    const [apartment,setApartment] = useState([]);
    const [filter, setFilter] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    useEffect(() =>{
       
        const fetchDetails =  async() =>{
            const response = await fetch("/apartment/view")
            const json = await  response.json()

            if(response.ok){
                setApartment(json)
            }

        }

        fetchDetails();
      
    },[]);

   const handleFilter = (e)=> {
        const searchWord = e.target.value;
        setWordEntered(searchWord);
        const newFilter = apartment.filter((value) => {
            return value.apartmentno .toLowerCase().includes(searchWord.toLowerCase());
        });
        if(searchWord === ""){
            setFilter([])
        }else{
            setFilter(newFilter);
        }
       
    }

   
 
    const clearInput = () =>{
        setFilter([]);
        setWordEntered("");
    }

  return (
    <div>
       
            <div className='searchInputs'>
                <input type ="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter} />
                {filter.length === 0 ? (
                <SearchIcon />
                ) : (
                    <CloseIcon id="clearBtn" onClick={clearInput} />
                 )}
            </div>
            {filter.length !== 0 && (
            <div className="dataResult">
                {filter.slice(0,10).map((value,key) => (
                    
                        <a className='dataItem' href="" target="_blank">
                            <p> {value.apartmentno} </p>
                        </a>
                    
                ))}
            </div>
            )}
        
    </div>
  )
}

export default SearchBar


