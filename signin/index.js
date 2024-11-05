const getPoke = async () => {
    const nomePoke = document.querySelector("#pokemon").value

    
    try{
        const requestInfo =await fetch (
            'https://pokeapi.co/api/v2/pokemon/'+ nomePoke,
        );
        const data = await requestInfo.json();

        console.log(data) ;
    } catch (error) {
        console.error (error);
    }
};


// (async () =>{
//     const pokemon = await getPoke();
//     console.log (pokemon);
// }
// )();



const onSubmitForm = (e)=>{
    e.preventDefault ()
    console.log(e)
    const form = e.target
    const name=form.email.value
    const age=form.email.value
    const gender=form.email.value
    const modality=form.email.value
    const experience=form.email.value
    const formation=form.email.value
    const email=form.email.value
    const senha=form.email.value
    const confirmarsenha=form.password.value
}