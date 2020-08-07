var dbServices = {};

dbServices.get = (document) => {
    document.get()
        .then(doc => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                console.log("No such document!");
            }
        })
        .catch(function(error) {
            console.log("Error getting document:", error);
        });
}

export default dbServices;