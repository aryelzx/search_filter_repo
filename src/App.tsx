import { useState, useEffect } from 'react'
interface Repo {
  name: string;
  description: string;
}
interface User{
  name: string;
}
export default function App() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [search, setSearch] = useState('')

useEffect(() => {
  fetch('https://api.github.com/users/aryelzx/repos')
  .then(response => response.json())
  .then(data => setRepos(data))
}, [])

useEffect(() => {}, [search])

  const filterredRepos = search.length > 0
  ? repos.filter(repo => repo.name.includes(search))
  : [];

  return (
    <div className="App">
      
      <h2>Pesquise um repositório:</h2>
      <input
       name="search"
       type="text"
       placeholder='Buscar...'
       onChange={(e=> setSearch(e.target.value))}
       value={search}
       />
    {search.length > 0 ? (
      <ul>
        {filterredRepos.map(repo => {
          return(
            <li key={repo.name}>
              <strong>{repo.name}</strong>
            </li>
          )
        })}
      </ul>
       ) : (
        <ul>
        {repos.map(repo => {
          return(
            <li key={repo.name}>
              <strong>{repo.name}</strong>
            </li>
          )
        })}
      </ul>
    )}
    </div>
  )
}

