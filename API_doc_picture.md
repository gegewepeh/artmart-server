--------------------------------------------------------
GET /pictures

//if artist id = 1
// if category Id = 1

// success

[
    {
        "id" : 1,
        "name" : "ART 1",
        "description" : "", //description boleh kosong
        "price" : 100000,
        "link" : "https://google.com",
        "hidden" : false,
        "Category" : {
            "name" : "casual"
        },
        "Artist" : {
            "username" : "artist",
            "firstName" : "art",
            "lastName" : "ist",
            "email" : "artist@mail.com",
        }
    },
    {
        "id" : 2,
        "name" : "ART 2",
        "description" : "this is art 2",
        "price" : 100000,
        "link" : "https://google.com",
        "hidden" : false,
        "Category" : {
            "id" : 1,
            "name" : "casual"
        },
        "Artist" : {
            "id" : 1,
            "username" : "artist",
            "firstName" : "art",
            "lastName" : "ist",
            "email" : "artist@mail.com",
        }
    }
]





--------------------------------------------------------
GET /artists/:artistId/pictures

// if artist id = 1

// success

[
    {
        "id" : 1,
        "name" : "ART 1",
        "description" : "", //description boleh kosong
        "price" : 100000,
        "hidden" : false,
        "link" : "https://google.com",
        "CategoryId" : 1,
        "ArtistId" : 1
    },
    {
        "id" : 2,
        "name" : "ART 2",
        "description" : "this is art 2",
        "price" : 100000,
        "hidden" : false,
        "link" : "https://google.com",
        "CategoryId" : 1,
        "ArtistId" : 1
    }
]


// error artist id not found

{
    "message" : "artist id not found"
}

// error if image empty

[]

// error internal server
{
    "message" : "error in internal server"
}


--------------------------------------------------------
GET /artists/:artistId/pictures/:pictureId

// if artist id = 1
// if image id = 1

// success


{
    "id" : 1,
    "name" : "ART 1",
    "description" : "", //description boleh kosong
    "price" : 100000,
    "hidden" : false,
    "link" : "https://google.com",
    "CategoryId" : 1,
    "ArtistId" : 1
}


// error artist id not found

{
    "message" : "artist id not found"
}

// error if image id not found

{
    "message" : "image id not found"
}

// error internal server
{
    "message" : "error in internal server"
}



--------------------------------------------------------
GET /artists/:artistId/pictures/:pictureId

// if artist id = 1
// if picture id = 1

// success


{
    "id" : 1,
    "name" : "ART 1",
    "description" : "", //description boleh kosong
    "price" : 100000,
    "hidden" : false,
    "link" : "https://google.com",
    "CategoryId" : 1,
    "ArtistId" : 1
}


// error artist id not found

{
    "message" : "artist id not found"
}

// error if image id not found

{
    "message" : "image id not found"
}

// error internal server
{
    "message" : "error in internal server"
}



--------------------------------------------------------
POST /artists/:artistId/images ( create new picture )

SEND BODY

{

    "name" : "ART 1",
    "description" : "", //description boleh kosong
    "price" : 100000, // number
    "link" : "https://google.com",
    "CategoryId" : 1,
    "ArtistId" : 1
}


RESPONSE

// success

{
    "id" : 1,
    "name" : "ART 1",
    "description" : "", //description boleh kosong
    "price" : 100000,
    "hidden" : false,
    "link" : "https://google.com", 
    "CategoryId" : 1,
    "ArtistId" : 1
}



--------------------------------------------------------
PATCH /artists/:artistId/picture/:pictureId

if artistId = 1
if categoryI = 1

SEND BODY

{
    "title" : "arts 1"
}


//or

{
    "price" : 150000
}

//or

{
    "hidden" : true
}


RESPONSE

//success

{
    "id" : 1,
    "name" : "arts 1",
    "description" : "", //description boleh kosong
    "price" : 150000,
    "hidden" : true,
    "link" : "https://google.com", 
    "CategoryId" : 1,
    "ArtistId" : 1
}



--------------------------------------------------------
DELETE /artists/:artistId/picture/:pictureId


if imageId = 1

RESPONSE

//success

{
    "message" : "image id 1 success delete"
}