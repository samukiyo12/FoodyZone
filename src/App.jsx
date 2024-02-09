import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import {GlobalStyle} from './main';
import SearchResult from './component/SearchResult/SearchResult';
export const BASE_URL="http://localhost:9000";
const App = () => {
  const [data,setData]=useState(null);
  const [filteredData,setFilteredData]=useState(null)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null);
  const [selectedBtn,setSelectedBtn]=useState()

  useEffect(() => {
    const fetchFoodData=async()=>{
      setLoading(true)
      try {
        const res=await fetch(BASE_URL);
        const json=await res.json()
        setData(json);
        setFilteredData(json);
        setLoading(false)
      } catch (error) {
        setError("unable to fetch data");
      }
    }
    fetchFoodData();
  }, []);
   const searchFood=(e)=>{
      const searchValue=e.target.value;
      console.log(searchValue)

      if(searchValue==""){
        setFilteredData(null)
      }
      const filter=data?.filter((food)=> food.name.toLowerCase().includes(searchValue.toLowerCase()));
      setFilteredData(filter);
   }
   const filteredFood=(type)=>{
      if(type==="all"){
        setFilteredData(data)
        selectedBtn("all")
        return;
      }
      const filter=data?.filter((food)=> food.type.toLowerCase().includes(type.toLowerCase()));
      setFilteredData(filter);
      setSelectedBtn(type)

   }
   const filterBtn = [
    { 
        name:"All",
        type:"All"
    },
    { 
      name:"Breakfast",
      type:"Breakfast"
    },
    {  
      name:"Lunch",
      type:"Lunch"
    },
    { 
      name:"Dinner",
      type:"Dinner"
    }
   
   ]

  if(error) return <div>{error}</div>
  if(loading) return <div>loading...</div>
  
  return (
    <>
    <Container>
      <GlobalStyle/>
     <TopContainer>
      <div className="logo">
        <img src="/logo.svg" alt="logo" />
      </div>
      <div className="search">
        <input onChange={searchFood} placeholder="Search Food..." />
      </div>
     </TopContainer>
      <FilterContainer>
        {filterBtn.map((value)=>(
          <Button key={value.name} onClick={()=>filteredFood(value.type)} >{value.name}</Button>
        ))}
        
        {/* <Button onClick={()=>filteredFood("BreakFast")}>BreakFast</Button>
        <Button onClick={()=>filteredFood("Lunch")}>Lunch</Button>
        <Button onClick={()=>filteredFood("Dinner")} >Dinner</Button> */}
      </FilterContainer>
      
    </Container>
    <SearchResult data={filteredData}/>
    </>
   
    
  );
};

export default App;
export const Container=styled.div`
  max-width:1200px;
  margin:0 auto;
`;
const TopContainer=styled.section`
  min-width:140px;
  display:flex;
  justify-content:space-between;
  padding:16px;
  align-items:center;
  .search{
    input{
      background-color:transparent;
      border:1px solid red;
      color:white;
      border-radius:5px;
      height:40px;
      font-size:16px;
      padding:0 10px;
    }
  }
`;
const FilterContainer=styled.section`
display:flex;
justify-content:center;
gap:12px;
padding-bottom:40px;
`;
export const Button=styled.button`
  background:#ff4343;
  border-radius:5px;
  padding:6px 12px;
  border:none;
  color:white;
`;
