
        lucide.createIcons();

        const classesFonte = ['texto-tamanho-normal', 'texto-tamanho-grande', 'texto-tamanho-gigante'];
        let indiceFonte = 0; 
        let estaModoNoturno = false;

        let indiceSimulacaoAtual = 0;
        let indiceQuizAtual = 0;
        let pontuacaoQuiz = 0;

        let botaoAudioAtivo = null;

        // Base de Dados do Treino
        const simulacoes = [
            {
                remetente: "Número Desconhecido (WhatsApp)",
                avatar: "WA",
                texto: '"Oi mãe! Mudei de número. O meu outro celular quebrou. Preciso pagar uma conta urgente de R$ 350 hoje. Pode fazer um Pix pra mim?"',
                ehGolpe: true,
                explicacao: "É GOLPE! Golpistas usam fotos de parentes para pedir dinheiro com números novos. Sempre ligue no número antigo para confirmar."
            },
            {
                remetente: "Entregador de Encomenda (SMS)",
                avatar: "COR",
                texto: '"Sua encomenda está retida nos Correios. Pague a taxa de R$ 18,90 pelo link www.correio-taxa-falsa.com para liberar a entrega."',
                ehGolpe: true,
                explicacao: "É GOLPE! Os Correios não enviam links cobrando taxas urgentes por SMS. Nunca clique no link."
            },
            {
                remetente: "Filho João (Contato Salvo)",
                avatar: "JO",
                texto: '"Oi pai, tudo bem? Quando puder me liga pra gente combinar o almoço de domingo com os netos!"',
                ehGolpe: false,
                explicacao: "É SEGURA! Esta é uma mensagem normal de um contato que você já tem salvo no celular."
            },
            {
                remetente: "Atendimento do Banco (SMS)",
                texto: '"ALERTA BANCO: Compra aprovada de R$ 2.450 no Cartão de Crédito. Se não reconhece, ligue imediatamente para 0800-000-0000."',
                avatar: "BCO",
                ehGolpe: true,
                explicacao: "É GOLPE! Esse \'0800\' é falso e vai cair em golpistas que vão pedir suas senhas. Ligue apenas no número impresso no seu cartão de plástico."
            },
            {
                remetente: "Pessoa Desconhecida",
                avatar: "PIX",
                texto: '"Mossa desculpa! Fiz um Pix de R$ 200 errado pra sua conta sem querer. Pode me devolver nesse Pix que te passei aqui?"',
                ehGolpe: true,
                explicacao: "É GOLPE! É o golpe do falso Pix. Verifique antes diretamente no aplicativo do seu banco se o valor realmente entrou ou fale com seu gerente."
            },
            {
                remetente: "Farmácia do Bairro (Contato Salvo)",
                avatar: "FAR",
                texto: '"Dona Maria, o seu remédio que estava encomendado chegou! Pode passar aqui para retirar quando quiser. Bom dia!"',
                ehGolpe: false,
                explicacao: "É SEGURA! Uma mensagem informativa simples da farmácia onde você já faz compras."
            }
        ];

        // Base de Dados do Quiz
        const perguntasQuiz = [
            {
                pergunta: "O banco liga para você pedindo sua senha de 6 dígitos para cancelar uma compra suspeita. O que você faz?",
                opcoes: [
                    { texto: "Entrega a senha para resolver rápido", correta: false },
                    { texto: "Desliga o telefone imediatamente", correta: true },
                    { texto: "Pede para falar com o gerente e dá a senha", correta: false }
                ],
                explicacao: "Correto! O banco NUNCA liga pedindo sua senha pessoal por telefone."
            },
            {
                pergunta: "Chega uma mensagem dizendo que você ganhou um prêmio de R$ 5.000, mas precisa pagar R$ 50 para receber. O que é isso?",
                opcoes: [
                    { texto: "Uma sorte grande que você deu", correta: false },
                    { texto: "Um golpe de internet", correta: true },
                    { texto: "Uma promoção oficial de fim de ano", correta: false }
                ],
                explicacao: "Exato! Se pedem dinheiro para entregar um prêmio que você não concorreu, é golpe."
            },
            {
                pergunta: "O que é mais seguro fazer ao criar uma senha para o seu celular ou aplicativo?",
                opcoes: [
                    { texto: "Usar a sua data de nascimento", correta: false },
                    { texto: "Usar a sequência 123456 porque é simples", correta: false },
                    { texto: "Criar uma combinação que só você saiba e não seja óbvia", correta: true }
                ],
                explicacao: "Muito bem! Evite datas comemorativas ou sequências numéricas fáceis."
            },
            {
                pergunta: "Chegou um código por SMS no celular com a mensagem: 'Não compartilhe este código com ninguém'. Alguém liga pedindo esse código. O que fazer?",
                opcoes: [
                    { texto: "Não passar o código de jeito nenhum", correta: true },
                    { texto: "Passar o código se a pessoa parecer simpática", correta: false },
                    { texto: "Passar o código apenas se a pessoa disser que é do suporte", correta: false }
                ],
                explicacao: "Perfeito! Esse código dá acesso às suas contas (como o WhatsApp). Nunca o compartilhe."
            },
            {
                pergunta: "Você quer fazer uma compra de um produto em uma loja da internet pela primeira vez. Qual é a atitude mais segura?",
                opcoes: [
                    { texto: "Comprar imediatamente no primeiro anúncio que aparecer", correta: false },
                    { texto: "Pedir ajuda a um familiar para verificar se o site é confiável", correta: true },
                    { texto: "Pagar no Pix direto na chave de uma pessoa física desconhecida", correta: false }
                ],
                explicacao: "Correto! Em lojas novas ou desconhecidas, pedir a ajuda de um parente evita cair em sites falsos."
            },
            {
                pergunta: "Você recebeu uma ligação de alguém dizendo que um parente seu foi sequestrado e pedindo dinheiro rápido. O que você deve fazer primeiro?",
                opcoes: [
                    { texto: "Correr até o banco para fazer o Pix imediatamente", correta: false },
                    { texto: "Manter a calma, desligar e ligar diretamente para o seu parente", correta: true },
                    { texto: "Passar os números dos seus cartões de crédito para o golpista", correta: false }
                ],
                explicacao: "Muito bem! Trata-se do golpe do 'falso sequestro'. Mantenha a calma, desligue a ligação e chame seu parente direto."
            }
        ];

        // MUDANÇA DE TAMANHO DE LETRA
        function alterarTamanhoFonte(direcao) {
            const corpo = document.getElementById('corpoAplicativo');
            corpo.classList.remove(...classesFonte);

            if (direcao === 'aumentar' && indiceFonte < classesFonte.length - 1) {
                indiceFonte++;
            } else if (direcao === 'diminuir' && indiceFonte > 0) {
                indiceFonte--;
            }

            corpo.classList.add(classesFonte[indiceFonte]);
        }

        // MODO ESCURO
        function alternarModoNoturno() {
            estaModoNoturno = !estaModoNoturno;
            const corpo = document.getElementById('corpoAplicativo');
            const textoModo = document.getElementById('textoModo');
            const iconeModo = document.getElementById('iconeModo');

            if (estaModoNoturno) {
                corpo.classList.add('modo-noturno');
                textoModo.innerText = "Modo Claro";
                iconeModo.setAttribute('data-lucide', 'sun');
            } else {
                corpo.classList.remove('modo-noturno');
                textoModo.innerText = "Modo Escuro";
                iconeModo.setAttribute('data-lucide', 'moon');
            }
            
            setTimeout(() => { lucide.createIcons(); }, 50);
        }

        // SISTEMA DE FALA APENAS SOB DEMANDA (TOGGLE)
        function toggleFala(texto, elementoBotao) {
            if (!('speechSynthesis' in window)) {
                alert('O seu aparelho não suporta a leitura por voz.');
                return;
            }

            const synth = window.speechSynthesis;

            if (synth.speaking && botaoAudioAtivo === elementoBotao) {
                pararVozTotal();
                return;
            }

            pararVozTotal();

            const fala = new SpeechSynthesisUtterance(texto);
            fala.lang = 'pt-BR';
            fala.rate = 0.88;

            mudarEstadoBotaoParaParar(elementoBotao);
            botaoAudioAtivo = elementoBotao;

            fala.onend = () => {
                restaurarEstadoBotao(elementoBotao);
                botaoAudioAtivo = null;
            };

            fala.onerror = () => {
                restaurarEstadoBotao(elementoBotao);
                botaoAudioAtivo = null;
            };

            synth.speak(fala);
        }

        function pararVozTotal() {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
            if (botaoAudioAtivo) {
                restaurarEstadoBotao(botaoAudioAtivo);
                botaoAudioAtivo = null;
            }
        }

        function mudarEstadoBotaoParaParar(btn) {
            if (!btn) return;
            btn.classList.remove('btn-audio');
            btn.classList.add('btn-tocando');

            const textSpan = btn.querySelector('span');
            if (textSpan) textSpan.innerText = 'Parar';

            const icon = btn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'square');
                lucide.createIcons();
            }
        }

        function restaurarEstadoBotao(btn) {
            if (!btn) return;
            btn.classList.remove('btn-tocando');
            btn.classList.add('btn-audio');

            const textSpan = btn.querySelector('span');
            if (textSpan) textSpan.innerText = 'Ouvir';

            const icon = btn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'volume-2');
                lucide.createIcons();
            }
        }

        // TROCA DE ABAS
        function trocarAba(nomeAba) {
            pararVozTotal();

            document.getElementById('secao-dicas').classList.add('hidden');
            document.getElementById('secao-simulador').classList.add('hidden');
            document.getElementById('secao-quiz').classList.add('hidden');

            const abas = document.querySelectorAll('.botao-aba');
            abas.forEach(aba => {
                aba.classList.remove('bg-blue-700', 'text-white', 'shadow');
                aba.classList.add('bg-slate-200', 'text-slate-700');
            });

            document.getElementById(`secao-${nomeAba}`).classList.remove('hidden');
            const abaAtiva = document.getElementById(`aba-${nomeAba}`);
            abaAtiva.classList.add('bg-blue-700', 'text-white', 'shadow');
            abaAtiva.classList.remove('bg-slate-200', 'text-slate-700');

            if (nomeAba === 'simulador') carregarSimulacao();
            if (nomeAba === 'quiz') iniciarQuiz();

            setTimeout(() => { lucide.createIcons(); }, 50);
        }

        // SIMULADOR DE TREINO
        function carregarSimulacao() {
            pararVozTotal();
            const sim = simulacoes[indiceSimulacaoAtual];
            document.getElementById('contador-simulacao').innerText = `Exemplo ${indiceSimulacaoAtual + 1} de ${simulacoes.length}`;
            document.getElementById('texto-remetente').innerText = sim.remetente;
            document.getElementById('avatar-simulacao').innerText = sim.avatar || "MSG";
            document.getElementById('texto-mensagem').innerText = sim.texto;
            
            const retorno = document.getElementById('retorno-simulacao');
            retorno.classList.add('hidden');
            retorno.className = "hidden p-4 rounded-xl text-lg font-medium text-center border-2";
        }

        function verificarSimulacao(usuarioDisseGolpe) {
            pararVozTotal();
            const sim = simulacoes[indiceSimulacaoAtual];
            const retorno = document.getElementById('retorno-simulacao');
            retorno.classList.remove('hidden');

            if (usuarioDisseGolpe === sim.ehGolpe) {
                retorno.className = "p-4 rounded-xl text-lg font-medium text-center border-2 bg-green-100 border-green-500 text-green-900";
                retorno.innerHTML = `<strong>Parabéns, você acertou! 🎉</strong><br>${sim.explicacao}`;
            } else {
                retorno.className = "p-4 rounded-xl text-lg font-medium text-center border-2 bg-red-100 border-red-500 text-red-900";
                retorno.innerHTML = `<strong>Atenção! Cuidado! ⚠️</strong><br>${sim.explicacao}`;
            }
        }

        function proximaSimulacao() {
            pararVozTotal();
            indiceSimulacaoAtual = (indiceSimulacaoAtual + 1) % simulacoes.length;
            carregarSimulacao();
        }

        // QUIZ DE CONHECIMENTO
        function iniciarQuiz() {
            indiceQuizAtual = 0;
            pontuacaoQuiz = 0;
            carregarPerguntaQuiz();
        }

        function carregarPerguntaQuiz() {
            pararVozTotal();
            const q = perguntasQuiz[indiceQuizAtual];
            document.getElementById('progresso-quiz').innerText = `Pergunta ${indiceQuizAtual + 1} de ${perguntasQuiz.length}`;
            document.getElementById('pergunta-quiz').innerText = q.pergunta;

            const containerOpcoes = document.getElementById('opcoes-quiz');
            containerOpcoes.innerHTML = '';

            const retorno = document.getElementById('retorno-quiz');
            retorno.classList.add('hidden');
            document.getElementById('botao-proxima-quiz').classList.add('hidden');

            q.opcoes.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = "botao-opcao-quiz w-full p-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-lg text-left rounded-xl border-2 border-slate-300 transition flex items-center justify-between gap-2 shadow-sm";
                
                btn.innerHTML = `
                    <span class="flex-grow leading-snug">${opt.texto}</span>
                    <button type="button" onclick="event.stopPropagation(); toggleFala('Opção ${idx + 1}: ${opt.texto.replace(/'/g, "\\'")}', this)" class="btn-audio px-2 py-1 rounded-md text-xs flex items-center gap-1 flex-shrink-0" title="Ouvir esta opção">
                        <i data-lucide="volume-2" class="w-4 h-4"></i>
                        <span>Ouvir</span>
                    </button>
                    <i data-lucide="chevron-right" class="w-5 h-5 flex-shrink-0 text-slate-400"></i>
                `;
                btn.onclick = () => responderQuiz(opt.correta, q.explicacao);
                containerOpcoes.appendChild(btn);
            });

            lucide.createIcons();
        }

        function responderQuiz(ehCorreta, explicacao) {
            pararVozTotal();
            const retorno = document.getElementById('retorno-quiz');
            retorno.classList.remove('hidden');

            const botoesOpcao = document.querySelectorAll('#opcoes-quiz button');
            botoesOpcao.forEach(btn => btn.disabled = true);

            if (ehCorreta) {
                pontuacaoQuiz++;
                retorno.className = "p-4 rounded-xl text-lg font-bold text-center border-2 bg-green-100 border-green-500 text-green-900";
                retorno.innerHTML = `<strong>Resposta Correta! ✅</strong><br><span class="font-normal text-base block mt-1">${explicacao}</span>`;
            } else {
                retorno.className = "p-4 rounded-xl text-lg font-bold text-center border-2 bg-red-100 border-red-500 text-red-900";
                retorno.innerHTML = `<strong>Ops! Resposta incorreta. ❌</strong><br><span class="font-normal text-base block mt-1">${explicacao}</span>`;
            }

            document.getElementById('botao-proxima-quiz').classList.remove('hidden');
        }

        function proximaPerguntaQuiz() {
            pararVozTotal();
            indiceQuizAtual++;
            if (indiceQuizAtual < perguntasQuiz.length) {
                carregarPerguntaQuiz();
            } else {
                exibirResultadoQuiz();
            }
        }

        function exibirResultadoQuiz() {
            pararVozTotal();
            document.getElementById('progresso-quiz').innerText = "Quiz Concluído!";
            document.getElementById('pergunta-quiz').innerText = "Resultado do seu Teste";

            const containerOpcoes = document.getElementById('opcoes-quiz');
            containerOpcoes.innerHTML = `
                <div class="text-center p-6 bg-blue-50 rounded-2xl border-2 border-blue-200 space-y-3 cartao">
                    <p class="text-2xl font-bold text-blue-900">Você acertou ${pontuacaoQuiz} de ${perguntasQuiz.length} perguntas!</p>
                    <p class="text-lg text-slate-700">Continue praticando para manter suas navegações na internet sempre seguras.</p>
                    <button onclick="toggleFala('Você acertou ${pontuacaoQuiz} de ${perguntasQuiz.length} perguntas! Continue praticando para manter suas navegações na internet sempre seguras.', this)" class="btn-audio mt-2 px-4 py-2 rounded-full font-bold flex items-center justify-center gap-2 mx-auto shadow">
                        <i data-lucide="volume-2" class="w-5 h-5"></i>
                        <span>Ouvir Resultado</span>
                    </button>
                </div>
            `;

            document.getElementById('retorno-quiz').classList.add('hidden');
            const btnProxima = document.getElementById('botao-proxima-quiz');
            btnProxima.innerText = "Refazer o Teste";
            btnProxima.onclick = iniciarQuiz;
            btnProxima.classList.remove('hidden');
        }

        // MODAL DE EMERGÊNCIA (SOS)
        function abrirModalEmergencia() {
            document.getElementById('modalEmergencia').classList.remove('hidden');
            carregarContactoSalvo();
            lucide.createIcons();
        }

        function fecharModalEmergencia() {
            pararVozTotal();
            document.getElementById('modalEmergencia').classList.add('hidden');
            document.getElementById('retornoAjuda').classList.add('hidden');
        }

        function copiarMensagemAjuda() {
            pararVozTotal();
            const textoAjuda = "Olá! Recebi uma mensagem no meu celular e estou na dúvida se é verdade ou golpe. Pode me ajudar a verificar?";
            
            const elementoTemporario = document.createElement("textarea");
            elementoTemporario.value = textoAjuda;
            document.body.appendChild(elementoTemporario);
            elementoTemporario.select();
            document.execCommand("copy");
            document.body.removeChild(elementoTemporario);

            const retorno = document.getElementById('retornoAjuda');
            retorno.innerText = "Mensagem copiada com sucesso! Agora basta abrir o WhatsApp e colar para o seu familiar.";
            retorno.classList.remove('hidden');
        }

        // GESTÃO DO CONTACTO DE CONFIANÇA FAMILIAR
        function carregarContactoSalvo() {
            const nome = localStorage.getItem('contacto_nome_guia');
            const numero = localStorage.getItem('contacto_numero_guia');

            const containerSalvo = document.getElementById('containerContactoSalvo');
            const containerConfig = document.getElementById('containerConfigContacto');

            if (nome && numero) {
                document.getElementById('nomeContactoSalvo').innerText = `${nome} (${numero})`;
                document.getElementById('linkLigarFamiliar').setAttribute('href', `tel:${numero}`);
                containerSalvo.classList.remove('hidden');
                containerConfig.classList.add('hidden');
            } else {
                containerSalvo.classList.add('hidden');
                containerConfig.classList.remove('hidden');
            }
        }

        function guardarContactoFamiliar() {
            pararVozTotal();
            const nome = document.getElementById('inputNomeFamiliar').value.trim();
            const numero = document.getElementById('inputNumeroFamiliar').value.trim();

            if (!nome || !numero) {
                alert('Por favor, preencha o nome e o número de celular do familiar.');
                return;
            }

            localStorage.setItem('contacto_nome_guia', nome);
            localStorage.setItem('contacto_numero_guia', numero);

            carregarContactoSalvo();
            lucide.createIcons();
        }

        function editarContactoFamiliar() {
            document.getElementById('containerContactoSalvo').classList.add('hidden');
            document.getElementById('containerConfigContacto').classList.remove('hidden');
        }

        window.onload = function() {
            carregarContactoSalvo();
            lucide.createIcons();
        };