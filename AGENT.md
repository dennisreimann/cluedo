# Cluedo

Erstelle eine Single Page Web App, mit der ein Spieler des Brettspiels Cluedo den Ermittlungsstand tracken kann: Man soll vor dem Spiel die Namen der Mitspieler angeben können und diese Namen werden für die kommenden Spiele gespeichert.

Die App soll für Handy-Displays optimiert sein. Persistenz erfolgt im Local Storage des Browsers. Verwende Vue 3.

Im Spielmodus sind die Täter, Tatwaffen und Räume markierbar: Man kann diese aus einer Liste auswählen und mit dem Namen eines Mitspielers abstreichen, um zu markieren, dass der Mitspieler einem die dazugehörige Karte gezeigt hat. Man kann diese Markierung zusätzlich mit einem Fragezeichen versehen, um zu signalisieren, dass man sich nicht sicher ist.

Der aktuelle Spielzustand wird ebenfalls bei jeder änderung im Local Storage persistiert, für den Fall dass man die Seite verlässt. Es gibt jedoch die Möglichkeit, ein neues Spiuel zu beginnen und den Spielzustand damit zurückzusetzen.
Man kann aus dem Spielmodus zurückgehen, um die Liste der Mitspieler zu bearbeiten.
