import style from "./navbar.module.css"

export const Navbar = ()=>{
    return(
        <div className={style.navbarCorpo}>
            <ul>
               <a href="/"><li>Characters</li></a> 
               <a href="/episodios"><li>Episodes</li></a>
               <a href="/locais"><li>Locations</li></a> 
            </ul>
        </div>
    )
}