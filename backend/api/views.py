import os
import openai
from openai import OpenAI
from dotenv import load_dotenv
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def summarize_text(request):
    if request.method == 'POST':
        # リクエストからテキストデータを取得
        data = json.loads(request.body.decode('utf-8'))
        user_text = data.get('text')
        
        # API Keyを環境変数から取得
        load_dotenv()
        # OpenAI APIを使用してテキストの要約を行う
        client = OpenAI(
        # This is the default and can be omitted
            api_key = os.environ.get("OPENAI_API_KEY")
        )

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "あなたは地球科学の専門家です。"},
                {"role": "user", "content": f"""
                    #指示
                    活動記録からユーザーが行った主な活動を抽出して下さい。それに伴う二酸化炭素の排出量を見積もって、合計して下さい。
                    そうして、どれだけの二酸化炭素を1日で排出したか見積もって教えて下さい。
                    結果は出力方式のフォーマットと同じように教えて下さい。それ以外のことは必要ありません。
                    
                    #前提知識
                    ・人間は呼吸をするだけで1日1kgほどのCO2を排出します。
                    ・呼吸以外に二酸化炭素を排出する主な活動原因は、化石燃料の燃焼、自動車の利用、電気などのエネルギー使用、廃棄物焼却、水道利用が挙げられます。
                    ・一人当たりの自動車由来のCO2排出量は1日あたり約1.36kgと推計されています。通勤や通学で公共交通機関を使う人も同じかもしれません。
                    ・家庭のガスや電気の使用に伴うCO2排出量は、一人当たり1日あたり約4.65kgと試算されています。
                    
                    #出力方式のフォーマット
                    あなたが今日排出した二酸化炭素の量は合計で〇〇kgです！
                    
                    #活動記録
                    {user_text}
                """}
            ],
            temperature=0.5,
            max_tokens=150,
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0
        )
            
            # 要約結果をフロントエンドに返す
        summary_text = response.choices[0].message.content
        return JsonResponse({'summary': summary_text})
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)
