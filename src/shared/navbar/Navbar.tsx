import "./navbar.css"


export const Navbar = ()=>{
    return(
        <div className="navbarCorpo">
            <div className="testeVermelho"></div>
            <ul>
               <a href="/"><li>Personagens</li></a> 
               <a href="/episodios"><li>Episódios</li></a>
               <a href="/locais"><li>Localizações</li></a> 
            </ul>
        </div>
    )
}