from transformers import AutoModelForQuestionAnswering, AutoTokenizer,pipeline
import re

#helper
def convert_amount_to_dollars(amount):
    numbers = {
        "zero": 0, "one": 1, "two": 2, "three": 3, "four": 4,
        "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9,
        "ten": 10, "eleven": 11, "twelve": 12, "thirteen": 13,
        "fourteen": 14, "fifteen": 15, "sixteen": 16, "seventeen": 17,
        "eighteen": 18, "nineteen": 19, "twenty": 20, "thirty": 30,
        "forty": 40, "fifty": 50, "sixty": 60, "seventy": 70,
        "eighty": 80, "ninety": 90, "hundred": 100, "thousand": 1000
    }
    words = amount.split()
    if len(words) == 2:
        return str(numbers[words[0]])

    total_amount = 0
    i = 0
    while i < len(words):
        current_word = words[i]
        if "dollar" in current_word :
          break
        if current_word == "and":
            i += 1
            continue

        if current_word == "hundred":
            total_amount *= numbers[current_word]
        elif current_word == "thousand":
            total_amount *= numbers[current_word]
            total_amount += numbers[words[i - 1]] * numbers[current_word]
        else:
            total_amount += numbers[current_word]

        i += 1

    return str(total_amount)
#helper
def extract_number_from_string(input_string):
    number = re.findall(r'\d+', input_string)
    if number:
        return int(number[0])
    else:
        return None
      
#main command
def get_phrase_command(phrase):
  # Init model
  model_name = "deepset/roberta-base-squad2"
  model = AutoModelForQuestionAnswering.from_pretrained(model_name)
  tokenizer = AutoTokenizer.from_pretrained(model_name)

  # a) Get predictions
  nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)
  zeroshot = pipeline("zero-shot-classification", model="valhalla/distilbart-mnli-12-3")


  #mapping below to functions
  transaction_map = {
      "deposit": ["deposit", "Deposit", "put in", "stash", "keep", "store", "drop off", "deliver", "leave", "pay in", "transfer", "put", "add", "contribute", "credit", "place", "settle", "invest", "plant", "pile", "post"],
      "withdrawal": ["withdraw", "cash out", "pull out", "take out", "retrieve", "extract", "take away", "pull", "deduct", "fetch", "obtain", "get back", "reclaim", "remove", "collect", "disburse", "deplete", "reclaim", "cash withdrawal", "money withdrawal",
                    "want" , "get" , "take" , "give me" , "I need" , "can i have"]
  }
  
  each_potential_phrase_clean = phrase.replace("-"," ")
  QA_input_transaction = {
      'question': 'what is the person trying to do with money? ',
      'context': each_potential_phrase_clean
  }
  response_transaction = nlp(QA_input_transaction)
  found = False
  for transaction_type,synonyms in transaction_map.items() :
    for word in synonyms:
      if word in response_transaction["answer"].lower():
        response_transaction["answer"]  = transaction_type
        found = True
      if found:
        break
    if found:
      break

  #if at this point transaction["answer"] is not deposit or withdrawal, we zero-shot
  if response_transaction["answer"].lower() not in transaction_map.keys():
    print(response_transaction["answer"])
    res = zeroshot(phrase,["Deposit" , "Withdrawal", "Non Money Related"])
    label  = res["labels"][res["scores"].index(max(res["scores"]))]
    response_transaction["answer"] = label
    print("zero-shotted")


  QA_input_amount = {
      'question': f'how much is the user trying to {response_transaction}',
      'context': each_potential_phrase_clean
  }
  response_amount = nlp(QA_input_amount)

  formatted_value = False
  if any(char.isdigit() for char in response_amount["answer"]):
    response_amount["answer"]= extract_number_from_string(response_amount["answer"])
    formatted_value = True

  if formatted_value == False:
    try:
      response_amount["answer"]=convert_amount_to_dollars(response_amount["answer"])
    except:
      print("Conversion Error")
  formatted_tuple = (response_transaction["answer"],response_amount["answer"])
  print(phrase)
  print(formatted_tuple)
  if formatted_value == False:
    print("Un_processed")
  return formatted_tuple
