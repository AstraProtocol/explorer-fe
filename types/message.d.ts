interface MsgCreateValidator {
	evmType?: string
	type: '/cosmos.staking.v1beta1.MsgCreateValidator'
	content: MsgCreateValidatorContent
}

interface MsgUnjailContent {
	txHash: string
	msgName: TransactionTypeEnum.MsgUnjail
	version: number
	msgIndex: number
	validatorAddress: string
	name: string
	uuid: string
	height: number
}

interface MsgEthereumTx {
	evmType?: string
	type: '/ethermint.evm.v1.MsgEthereumTx'
	content: MsgEthereumTxContent
}

interface MsgBeginRedelegate {
	evmType?: string
	type: string
	content: MsgBeginRedelegateContent
}

// --------------------------------------------------- //

interface MsgEthereumTxContent {
	msgIndex: number
	name: string
	uuid: string
	height: number
	params: {
		'from': string
		'hash': string
		'size': number
		'@type': TransactionTypeEnum.Ethermint
		'data': {
			'to': string
			'gas': string
			'r': string
			'v': string
			'@type': TransactionTypeEnum.Ethermint
			'nonce': string
			'value': string
			'gasPrice': string
			's': string
			'data': string
		}
	}
	fromAddress?: string
	toAddress?: string
	txHash: string
	msgName: TransactionTypeEnum.Ethermint
	version: number
}

interface MsgBeginRedelegateContent {
	height: number
	msgName: TransactionTypeEnum.MsgBeginRedelegate
	delegatorAddress: string
	autoClaimedRewards: TokenAmount
	validatorSrcAddress: string
	name: string
	uuid: string
	amount: TokenAmount
	txHash: string
	version: number
	msgIndex: number
	validatorDstAddress: string
}

interface MsgSendContent {
	amount: TokenAmount[]
	txHash: string
	msgName: TransactionTypeEnum.MsgSend
	msgIndex: number
	toAddress: string
	fromAddress: string
	name: string
	uuid: string
	height: number
	version: number
}

interface MsgExecContent {
	uuid: string
	height: number
	params: {
		'@type': TransactionTypeEnum.MsgExec
		'grantee': string
		'msgs': any[]
	}
	txHash: string
	msgName: TransactionTypeEnum.MsgExec
	version: number
	msgIndex: number
	name: string
}

interface MsgGrantContent {
	msgName: string
	version: number
	msgIndex: number
	name: string
	uuid: string
	height: number
	params: {
		maybeSendGrant: any
		maybeStakeGrant: any
		maybeGenericGrant: {
			'grantee': string
			'granter': string
			'@type': string
			'grant': {
				expiration: string
				authorization: {
					msg: string
				}
			}
		}
	}
	txHash: string
}

interface MsgVoteContent {
	option: string
	txHash: string
	msgName: TransactionTypeEnum.MsgVote
	version: number
	proposalId: string
	name: string
	uuid: string
	voter: string
	height: number
	msgIndex: number
}

interface MsgDelegateContent {
	txHash: string
	msgIndex: number
	msgName: TransactionTypeEnum.MsgDelegate
	version: number
	delegatorAddress: string
	validatorAddress: string
	name: string
	uuid: string
	amount: TokenAmount
	height: number
	autoClaimedRewards: TokenAmount
}

interface MsgUndelegateContent {
	name: string
	amount: TokenAmount
	txHash: string
	version: number
	delegatorAddress: string
	autoClaimedRewards: TokenAmount
	uuid: string
	height: number
	msgName: string
	msgIndex: number
	unbondCompleteAt: string
	validatorAddress: string
}

interface MsgWithdrawDelegatorRewardContent {
	amount: TokenAmount[]
	height: number
	msgName: TransactionTypeEnum.MsgWithdrawDelegatorReward
	version: number
	msgIndex: number
	validatorAddress: string
	name: string
	uuid: string
	txHash: string
	delegatorAddress: string
	recipientAddress: string
}

interface MsgCreateValidatorContent {
	height: number
	txHash: string
	msgName: TransactionTypeEnum.MsgCreateValidator
	msgIndex: number
	delegatorAddress: string
	validatorAddress: string
	name: string
	amount: TokenAmount
	version: number
	uuid: string
	commissionRates: CommissionRates
	tendermintPubkey: string
	description: ValidatorData
	minSelfDelegation: string
}

interface CommissionRates {
	rate: string
	maxRate: string
	maxChangeRate: string
}

interface TextProposalFullContent {
	name: string
	txHash: string
	msgIndex: number
	initialDeposit: {
		denom: string
		amount: string
	}[]
	version: number
	proposalId: string
	proposerAddress: string
	uuid: string
	height: number
	content: {
		'title': string
		'description': string
		'@type': string
		'changes'?: {
			key: string
			value: string
			subspace: string
		}[]
	}
	msgName: string
}

interface MsgDepositContent {
	name: string
	uuid: string
	height: number
	txHash: string
	msgName: string
	proposalId: string
	amount: {
		denom: string
		amount: string
	}[]
	version: number
	msgIndex: number
	depositor: string
}

interface MsgUpdateClientContent {
	uuid: string
	height: number
	params: {
		signer: string
		clientId: string
		clientType: string
		consensusHeight: {
			revisionHeight: string
			revisionNumber: string
		}
		maybeTendermintLightClientUpdate: {
			header: {
				'validatorSet': {
					proposer: {
						pubKey: {
							ed25519: string
						}
						address: string
						votingPower: string
						proposerPriority: string
					}
					validators: {
						address: string
						votingPower: string
						proposerPriority: string
						pubKey: {
							ed25519: string
						}
					}[]
					totalVotingPower: string
				}
				'trustedHeight': {
					revisionHeight: string
					revisionNumber: string
				}
				'trustedValidators': {
					proposer: {
						proposerPriority: string
						pubKey: {
							ed25519: string
						}
						address: string
						votingPower: string
					}
					validators: {
						pubKey: {
							ed25519: string
						}
						address: string
						votingPower: string
						proposerPriority: string
					}[]
					totalVotingPower: string
				}
				'@type': string
				'signedHeader': {
					commit: {
						signatures: {
							signature: string
							timestamp: string
							blockIdFlag: string
							validatorAddress: string
						}[]
						round: number
						height: string
						blockId: {
							partSetHeader: {
								hash: string
								total: number
							}
							hash: string
						}
					}
					header: {
						lastCommitHash: string
						validatorsHash: string
						nextValidatorsHash: string
						appHash: string
						chainId: string
						lastResultsHash: string
						proposerAddress: string
						time: string
						height: string
						version: {
							app: string
							block: string
						}
						dataHash: string
						lastBlockId: {
							hash: string
							partSetHeader: {
								total: number
								hash: string
							}
						}
						evidenceHash: string
						consensusHash: string
					}
				}
			}
		}
		maybeSoloMachineLightClientUpdate: null
	}
	txHash: string
	msgName: string
	version: number
	msgIndex: number
	name: string
}

interface MsgConnectionOpenInitContent {
	name: string
	uuid: string
	height: number
	params: {
		signer: string
		version: {
			features: string[]
			identifier: string
		}
		clientId: string
		delayPeriod: string
		connectionId: string
		counterparty: {
			prefix: {
				keyPrefix: string
			}
			clientId: string
			connectionId: string
		}
	}
	txHash: string
	msgName: string
	version: number
	msgIndex: number
}

interface MsgTransferContent {
	version: number
	msgIndex: number
	name: string
	uuid: string
	height: number
	params: {
		destinationChannel: string
		receiver: string
		packetData: {
			denom: string
			amount: string
			sender: string
			receiver: string
		}
		sourcePort: string
		sourceChannel: string
		timeoutHeight: {
			revisionHeight: string
			revisionNumber: string
		}
		packetSequence: string
		channelOrdering: string
		token: {
			denom: string
			amount: string
		}
		sender: string
		connectionId: string
		destinationPort: string
		timeoutTimestamp: string
	}
	txHash: string
	msgName: string
}

interface MsgCreateClientContent {
	version: number
	msgIndex: number
	name: string
	uuid: string
	height: number
	params: {
		clientType: string
		maybeLocalhostLightClient: null
		maybeTendermintLightClient: {
			consensusState: {
				'root': {
					hash: string
				}
				'@type': string
				'timestamp': string
				'nextValidatorsHash': string
			}
			clientState: {
				'proofSpecs': {
					maxDepth: number
					minDepth: number
					innerSpec: {
						hash: string
						childSize: number
						childOrder: number[]
						emptyChild: null
						maxPrefixLength: number
						minPrefixLength: number
					}
					leafSpec: {
						length: string
						prefix: string
						prehashKey: string
						prehashValue: string
						hash: string
					}
				}[]
				'unbondingPeriod': string
				'allowUpdateAfterMisbehaviour': boolean
				'@type': string
				'chainId': string
				'frozenHeight': {
					revisionHeight: string
					revisionNumber: string
				}
				'latestHeight': {
					revisionHeight: string
					revisionNumber: string
				}
				'maxClockDrift': string
				'trustingPeriod': string
				'allowUpdateAfterExpiry': boolean
				'trustLevel': {
					numerator: string
					denominator: string
				}
				'upgradePath': string[]
			}
		}
		maybeSoloMachineLightClient: null
		signer: string
		clientId: string
	}
	txHash: string
	msgName: string
}

interface MsgCreateClawbackVestingAccountContent {
	uuid: string
	height: number
	params: {
		'to_address': string
		'from_address': string
		'lockup_periods': {
			amount: {
				denom: string
				amount: string
			}[]
			length: string
		}[]
		'vesting_periods': {
			length: string
			amount: {
				denom: string
				amount: string
			}[]
		}[]
		'@type': string
		'merge': boolean
		'start_time': string
	}
	txHash: string
	msgName: string
	version: number
	msgIndex: number
	name: string
}

interface CommunityPoolSpendProposalContent {
	proposalId: string
	initialDeposit: {
		denom: string
		amount: string
	}[]
	proposerAddress: string
	height: number
	txHash: string
	msgName: string
	version: number
	msgIndex: number
	name: string
	uuid: string
	content: {
		'@type': string
		'title': string
		'amount': {
			denom: string
			amount: string
		}[]
		'description': string
		'recipientAddress': string
	}
}

interface MsgAcknowledgementContent {
	uuid: string
	height: number
	params: {
		packet: {
			sequence: string
			sourcePort: string
			sourceChannel: string
			timeoutHeight: {
				revisionHeight: string
				revisionNumber: string
			}
			destinationPort: string
			timeoutTimestamp: string
			destinationChannel: string
			data: string
		}
		signer: string
		connectionId: string
		packetSequence: string
		maybeMsgTransfer: {
			success: boolean
			receiver: string
			acknowledgement: string
			denom: string
			error: null
			amount: string
			sender: string
		}
		proofAcked: string
		application: string
		messageType: string
		proofHeight: {
			revisionHeight: string
			revisionNumber: string
		}
		acknowledgement: string
		channelOrdering: string
	}
	txHash: string
	msgName: string
	version: number
	msgIndex: number
	name: string
}

interface MsgRevokeContent {
	txHash: string
	msgName: string
	version: number
	msgIndex: number
	name: string
	uuid: string
	height: number
	params: {
		'@type': string
		'grantee': string
		'granter': string
		'msgTypeUrl': string
	}
}

interface MsgClawbackContent {
	name: string
	uuid: string
	height: number
	params: {
		'funder_address': string
		'account_address': string
		'@type': string
		'dest_address': string
	}
	txHash: string
	msgName: string
	version: number
	msgIndex: number
}

interface MsgWithdrawValidatorCommissionContent {
	txHash: string
	recipientAddress: string
	name: string
	height: number
	msgName: string
	version: number
	msgIndex: number
	validatorAddress: string
	uuid: string
	amount: TokenAmount[]
}
