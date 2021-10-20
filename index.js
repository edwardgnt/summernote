$(document).ready(function () {
    $('#summernote').summernote();
});

const getDocument = async () => {

    console.log("here in fun");

    var url = 'https://docs.google.com/document/d/e/2PACX-1vSJTj4BM23BIGM54n0t_KYjS_574GKqhIt-NzQ83i4J92kvjMwFx1mZwPnDirPbJvY9mbYROitXpipq/pub';

    axios(url)
        .then(response => {
            const html = response.data;

            $('img', html).each(async function () {
                let url = $(this).attr('src');

                console.log(url);

                const data = await fetch(url);
                const blob = await data.blob();
                const iresult = await blobToData(blob);

                console.log(iresult);

                url = iresult;


                //    items.insert.image = iresult;

            });
        });
};

const blobToData = (blob) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

const file_get_contents = async (url, callback) => {
    let res = await fetch(url),
        ret = await res.text();
    return callback ? callback(ret) : ret;
}

