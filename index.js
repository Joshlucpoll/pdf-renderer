const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.get("url")) {
  const create = document.getElementById("create");
  create.remove();

  const url = urlParams.get("url");

  // Asynchronous download of PDF
  var loadingTask = pdfjsLib.getDocument(
    "/pdf.pdf"
    // httpHeaders: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET",
    //   "Access-Control-Allow-Credentials": "true",
    //   "Access-Control-Allow-Credentials": "Range",
    // },
  );
  loadingTask.promise.then(
    function (pdf) {
      console.log("PDF loaded");

      // Fetch the first page
      var pageNumber = 1;
      pdf.getPage(pageNumber).then(function (page) {
        console.log("Page loaded");

        var scale = 1.5;
        var viewport = page.getViewport({ scale: scale });

        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById("the-canvas");
        var context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
          console.log("Page rendered");
        });
      });
    },
    function (reason) {
      // PDF loading error
      console.error(reason);
    }
  );

  // const iframe = document.createElement("iframe");
  // iframe.setAttribute("src", urlParams.get("url"));
  // iframe.setAttribute("id", "pdf-js-viewer");
  // iframe.setAttribute("frameborder", "0");

  // document.getElementById("pdf").appendChild(iframe);
}

function generateLink() {
  const pdfUrl = document.getElementById("pdf-url-input").value;
  const encodedURL =
    "https://pdf-renderer.joshlucpoll.dev?url=" + encodeURIComponent(pdfUrl);

  console.log(encodedURL);
  document.getElementById("link").innerHTML = encodedURL;
}
