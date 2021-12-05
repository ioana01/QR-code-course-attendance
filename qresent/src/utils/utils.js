import { database } from "../firebase";

export function CheckIfUserIsStudent(email: string) {
    return email.endsWith("@stud.acs.upb.ro") ? true : false;
}

export function CheckIfUserIsAdmin(email: string) {
    return email === ("admin@cs.pub.ro") ? true : false;
}

export function GetFirebaseKeyStudent(email: string) {
    const Refs = database.ref('students');
    let entry = "";

    Refs.on('value', snapshot => {
      snapshot.forEach(childSnapshot => {
          const childData = childSnapshot.val();
          if(childData.email === email) {
            entry = childSnapshot.key;
          }
      });
    });

    return entry;
}

export function CheckIfUserIsActive(email: string, refs: string) {

    const Refs = database.ref(refs);
    let check = false;
    Refs.on('value', snapshot => {  
        
      snapshot.forEach(childSnapshot => {
          const childData = childSnapshot.val();
          if(childData.isActive === true && childData.email === email) {
              check = true;
          }
      });
    });

    return check;
}