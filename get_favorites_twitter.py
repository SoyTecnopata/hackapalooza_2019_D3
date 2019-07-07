import tweepy
import pandas as pd

consumer_key = "5pkeOivdlWIfnIjQH0D8gLoKk"
consumer_secret = "d4dZxHQXHlpDVKLwFKmza6wqotAOkQEhmYtB3oujrt6yNXcsEs"
access_token = "921073038497546240-FihL8EPubRyKvUCbzzQwKuiEkf9hzPd"
access_token_secret = "VWjeV0ceU4dIYem7aLtWyCpVTa3f8jMfFpHZqNKet75Xo"

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

favorites = api.favorites( "@SoyTecnopata",3)

index = 0
dic_tweets = dict()

for tweets in favorites:
    
    text_of_tweet = tweets.text.encode("ascii", "ignore").decode("ascii", "ignore")

    dic_tweets[index] = text_of_tweet
    
    index += 1
    

import json
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_watson.natural_language_understanding_v1 import Features, RelationsOptions, CategoriesOptions

natural_language_understanding = NaturalLanguageUnderstandingV1(
    version='2018-11-16',
    iam_apikey='zq_JRbDtCInoaWml-ZAjfGFn2Vj2b9wvZzfRE1O5U_wJ',
    url='https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2018-11-16'
)

for keys in dic_tweets.keys():

    response = natural_language_understanding.analyze(
        text=dic_tweets[keys],
        features=Features(categories=CategoriesOptions(limit=5))).get_result()
    
    print(json.dumps(response, indent=2))
