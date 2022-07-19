mod utils;

#[macro_use]
extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index])
}

#[cfg(test)]
mod test {
    use super::rocket;
    use rocket::http::Status;
    use rocket::local::blocking::{Client, LocalResponse};

    #[test]
    fn hello_world() {
        let client = Client::tracked(rocket()).expect("valid rocket");
        let response: LocalResponse = client.get("/").dispatch();
        assert_eq!(response.status(), Status::Ok);
    }
}
