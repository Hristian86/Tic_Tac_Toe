const url = (parametar) => {
    const localUrl = "http://localhost:3002/api/";

    const asdKestrel = "https://localhost:5001/api/RegisterCodeModels";

    // Local url for development
    const aspDotNetCore = "https://localhost:44318/"

    // Hosting url for prod
    const herokuDotNet = "https://amazion.herokuapp.com/";

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        return aspDotNetCore + parametar;
    } else {
        // production code
        return herokuDotNet + parametar;
    }
}

export default url;