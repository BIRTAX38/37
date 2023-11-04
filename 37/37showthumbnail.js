            var currentURL = window.location.href;
            if (currentURL.startsWith("https://www.youtube.com/watch?")) {
                var videoId = new URL(currentURL).searchParams.get("v");
                var targetURL = "https://i.ytimg.com/vi/" + videoId + "/maxresdefault.jpg";
                window.open(targetURL);
}
