import json
import random

first_three = [
    {
        "name": "Ayesha K.",
        "text": "I've been using this Phaki for about a month now and I absolutely adore it. I've always had problems with bloating after meals, but this has changed everything for me.",
        "rating": 5,
        "verified": True,
    },
    {
        "name": "Zain M.",
        "text": "The best herbal remedy in the business! It's pure, natural, and actually works. I recommend this to everyone looking for a chemical-free digestive solution.",
        "rating": 5,
        "verified": True,
    },
    {
        "name": "Fatima R.",
        "text": "Finally a product that stays true to its traditional roots. It's gentle on the stomach and very effective. Never stopping this!",
        "rating": 5,
        "verified": True,
    },
]

names = [
    "Sana A.", "Hira M.", "Bilal K.", "Nadia S.", "Omar H.", "Rabia T.", "Usman F.", "Mehreen Z.",
    "Ali R.", "Kiran P.", "Hamza L.", "Sadia N.", "Imran Q.", "Amna B.", "Tariq J.", "Hina W.",
    "Faisal D.", "Maryam C.", "Kamran G.", "Saba V.", "Arsalan E.", "Laiba I.", "Shahid O.", "Nimra U.",
    "Waqas Y.", "Dua X.", "Asad P.", "Zoya K.", "Rashid M.", "Eman S.", "Junaid H.", "Areeba F.",
    "Saad T.", "Mahnoor L.", "Danish R.", "Hafsa N.", "Adnan B.", "Iqra J.", "Yasir W.", "Samina D.",
    "Kashif G.", "Noreen V.", "Farhan E.", "Saima I.", "Naveed O.", "Rimsha U.", "Talha Y.", "Anum X.",
    "Rehan P.", "Sidra K.", "Murtaza M.", "Bushra S.", "Haider H.", "Uzma F.", "Zeeshan T.", "Kinza L.",
    "Adeel R.", "Fariha N.", "Salman B.", "Tehmina J.", "Rizwan W.", "Ghazala D.", "Noman G.", "Shazia V.",
    "Javed E.", "Rubab I.", "Khalid O.", "Nazia U.", "Asim Y.", "Palwasha X.", "Fahad P.", "Samreen K.",
    "Waleed M.", "Amina S.", "Hassan H.", "Sundas F.", "Moiz T.", "Farah L.", "Babar R.", "Naila N.",
    "Shoaib B.", "Komal J.", "Irfan W.", "Saira D.", "Parvez G.", "Aleena V.", "Naeem E.", "Huma I.",
    "Sohail O.", "Rukhsar U.", "Azhar Y.", "Madiha X.", "Qasim P.", "Beenish K.", "Tahir M.", "Sanam S.",
    "Akbar H.", "Fouzia F.", "Rameez T.", "Alina L.", "Shehryar R.", "Nida N.", "Khurram B.", "Sumbul J.",
    "Fawad W.", "Aisha D.", "Haroon G.", "Zainab V.", "Mansoor E.", "Qurat I.", "Saqlain O.", "Farzana U.",
    "Basit Y.", "Maria X.", "Yousuf P.", "Tooba K.", "Shahzaib M.", "Anila S.", "Rafay H.", "Sehrish F.",
]

openers = [
    "After just two weeks",
    "Within a few days",
    "I started using this phaki",
    "My whole family now uses",
    "Honestly",
    "This has been a game changer",
    "I was skeptical at first but",
    "COD delivery was smooth and",
    "No more heavy feeling after dinner",
    "Gentle and effective",
    "Traditional taste with real results",
    "I take a small spoon after meals and",
    "Perfect for post-meal discomfort",
    "Natural relief without side effects",
    "Finally found something that works",
    "Recommended by a friend and",
    "Using it daily for a month and",
    "Light on the stomach and",
    "Helps with acidity and",
    "Great for bloating and",
]

middles = [
    "my digestion feels much lighter",
    "bloating after meals is almost gone",
    "acidity stays under control",
    "my stomach feels calm and comfortable",
    "gas issues reduced noticeably",
    "I feel active after eating",
    "evening heaviness is gone",
    "morning routine feels better",
    "post-dinner discomfort improved a lot",
    "gut feels balanced every day",
    "no more uncomfortable fullness",
    "digestion feels natural again",
    "stomach stays settled through the day",
    "mealtime discomfort reduced significantly",
    "I feel lighter and more energetic",
]

closers = [
    "Highly recommend for anyone with digestive issues.",
    "Will definitely order again.",
    "100% herbal and trustworthy.",
    "Best herbal product I have tried.",
    "Worth every rupee.",
    "Genuine quality and fast delivery.",
    "My mother loves it too.",
    "Perfect for daily use.",
    "No chemicals, just pure herbs.",
    "Already placed my second order.",
    "Five stars from our household.",
    "Sharing with relatives now.",
    "Exactly what I needed.",
    "Very satisfied customer.",
    "True to traditional herbal wisdom.",
]

reviews = list(first_three)
used_texts = {r["text"] for r in first_three}
name_idx = 0
attempts = 0
while len(reviews) < 110 and attempts < 5000:
    attempts += 1
    text = f"{random.choice(openers)}, {random.choice(middles)}. {random.choice(closers)}"
    if text in used_texts:
        continue
    used_texts.add(text)
    reviews.append(
        {
            "name": names[name_idx % len(names)],
            "text": text,
            "rating": 5,
            "verified": random.random() > 0.15,
        }
    )
    name_idx += 1

output = r"c:\Users\ASUS\Desktop\Noor e Shifa\assets\reviews.json"
with open(output, "w", encoding="utf-8") as f:
    json.dump(reviews, f, ensure_ascii=False, indent=2)

print(f"{len(reviews)} reviews written to {output}")
