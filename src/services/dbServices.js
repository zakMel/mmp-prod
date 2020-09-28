
var dbServices = {};

dbServices.get = (document) => {
    return document.get()
        .then(doc => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                return true
            } else {
                console.log("No such document!");
                return false;
            }
        })
        .catch(function(error) {
            console.log("Error getting document:", error);
        });
}

dbServices.set = (document, data) => {
    document.set(data)
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
}

dbServices.delete = (document) => {
    document.delete()
        .then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });

}

export default dbServices;