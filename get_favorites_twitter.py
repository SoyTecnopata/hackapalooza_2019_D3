import tweepy
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_watson.natural_language_understanding_v1 import Features, ConceptsOptions, CategoriesOptions

consumer_key = "5pkeOivdlWIfnIjQH0D8gLoKk"
consumer_secret = "d4dZxHQXHlpDVKLwFKmza6wqotAOkQEhmYtB3oujrt6yNXcsEs"
access_token = "921073038497546240-FihL8EPubRyKvUCbzzQwKuiEkf9hzPd"
access_token_secret = "VWjeV0ceU4dIYem7aLtWyCpVTa3f8jMfFpHZqNKet75Xo"

def get_tags_from_fav(user):
    try:
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        
        api = tweepy.API(auth)
        
        favorites = api.favorites( user,3)
        
        index = 0
        dic_tweets = dict()
        
        for tweets in favorites:
            
            text_of_tweet = tweets.text.encode("ascii", "ignore").decode("ascii", "ignore")
        
            dic_tweets[index] = text_of_tweet
            
            index += 1
            
        
        natural_language_understanding = NaturalLanguageUnderstandingV1(
            version='2018-11-16',
            iam_apikey='zq_JRbDtCInoaWml-ZAjfGFn2Vj2b9wvZzfRE1O5U_wJ',
            url='https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2018-11-16'
        )
        
        tags = []
        
        for keys in dic_tweets.keys():
            try:
            
                response_categories = natural_language_understanding.analyze(
                    text=dic_tweets[keys],
                    features=Features(categories=CategoriesOptions(limit=5))).get_result()
                
                response_concepts = natural_language_understanding.analyze(
                text=dic_tweets[keys],
                features=Features(concepts=ConceptsOptions(limit=5))).get_result()
            
            
                if len(response_concepts["concepts"]) != 0:
                    for i in range(len(response_concepts["concepts"])):
                        tags.append(response_concepts["concepts"][i]["text"])
                        print('     '+str(response_concepts["concepts"][i]["text"]))
                    
                tags.append(response_categories["categories"][0]["label"].split("/")[-1])
                print('     '+str(response_categories["categories"][0]["label"].split("/")[-1]))
            except:
                continue
        
        return tags
    
    except:
        return None
