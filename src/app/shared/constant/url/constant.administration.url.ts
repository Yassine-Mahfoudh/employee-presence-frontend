const urlApi='http://localhost:8080/'

export const CONSTANTE_ADMINISTRATION_URL ={

    ACCESS_DATA:`${urlApi}/logaccess`,

    USERS: `${urlApi}/utilisateur`,
    USER: `${urlApi}/utilisateur/find`,
    ADD_USER:`${urlApi}/utilisateur/add`,
    UPDATE_USER:`${urlApi}/utilisateur/update`,
    DELETE_USER:`${urlApi}/utilisateur/delete`,

    PROFILS:`${urlApi}/profil`,
    PROFIL:`${urlApi}/profil/find`,
    ADD_PROFIL:`${urlApi}/profil/add`,
    UPDATE_PROFIL:`${urlApi}/profil/update`,
    DELETE_PROFIL:`${urlApi}/profil/delete`,
    
};