import React from "react";

export function CheckIfUserIsStudent(email: string) {
    return email.endsWith("@stud.acs.upb.ro") ? true : false;
}

export function CheckIfUserIsAdmin(email: string) {
    return email === ("admin@cs.pub.ro") ? true : false;
}