<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f5; padding: 30px;">
    <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        <div style="background: #4c1d95; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 20px;">B-AGILE</h1>
        </div>
        <div style="padding: 30px;">
            <h2 style="color: #1f2937; margin-top: 0;">Nouvelle connexion détectée</h2>
            <p style="color: #4b5563; line-height: 1.6;">
                Un client vient de se connecter à son espace sur le site B-AGILE.
            </p>
            <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Nom</td>
                    <td style="padding: 8px 0; color: #1f2937; font-weight: bold;">{{ $user->name }}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email</td>
                    <td style="padding: 8px 0; color: #1f2937; font-weight: bold;">{{ $user->email }}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Date</td>
                    <td style="padding: 8px 0; color: #1f2937; font-weight: bold;">{{ now()->format('d/m/Y à H:i') }}</td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>