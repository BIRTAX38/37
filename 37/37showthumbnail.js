            // Sprawdzanie aktualnego adresu URL
            var currentURL = window.location.href;

            // Sprawdzanie, czy aktualny adres URL rozpoczyna się od "https://www.youtube.com/watch?"
            if (currentURL.startsWith("https://www.youtube.com/watch?")) {
                // Pobieranie wartości parametru "v" z adresu URL
                var videoId = new URL(currentURL).searchParams.get("v");

                // Tworzenie adresu URL docelowego
                var targetURL = "https://i.ytimg.com/vi/" + videoId + "/maxresdefault.jpg";

                // Przenoszenie na żądaną stronę
                window.open(targetURL);
            }
