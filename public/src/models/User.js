/**
 * Created by CedricLecat on 18/11/15.
 */
function Event(id,local,facebook,twitter,google,displayName,firstName,lastName,city,birthday,gender,country,interests,picture,phone,contacts,events,groups)
{
    this.id = id;
    this.local = local;
    this.facebook = facebook;
    this.twitter = twitter;
    this.google = google;
    this.displayName = displayName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.birthday = birthday;
    this.gender = gender;
    this.country = country;
    this.interests = interests;
    this.picture = picture;
    this.phone = phone;
    this.contacts = contacts;

    //nieuw
    this.events = events;
    this.groups = groups;

}